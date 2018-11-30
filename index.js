const visitWithParents = require(`unist-util-visit-parents`);

const path = require(`path`);

const isRelativeUrl = require(`is-relative-url`);

const _ = require(`lodash`);

const {
  fluid
} = require(`gatsby-plugin-sharp`);

const Promise = require(`bluebird`);

const cheerio = require(`cheerio`);

const slash = require(`slash`);

module.exports = ({
  files,
  markdownNode,
  markdownAST,
  getNode,
  reporter,
  cache
}, pluginOptions) => {
  const defaults = {
    tag: 'rehype-img',
    maxWidth: 650,
    wrapperStyle: ``,
    linkImagesToOriginal: true,
    showCaptions: false,
    withWebp: false
  };

  const options = _.defaults(pluginOptions, defaults);

  const generateImages = async src => {
    const parentNode = getNode(markdownNode.parent);
    let imagePath;

    if (parentNode && parentNode.dir) {
      imagePath = slash(path.join(parentNode.dir, src));
    } else {
      return null;
    }

    const imageNode = _.find(files, file => {
      if (file && file.absolutePath) {
        return file.absolutePath === imagePath;
      }

      return null;
    });

    if (!imageNode || !imageNode.absolutePath) {
      return;
    }

    const fluidResult = await fluid({
      file: imageNode,
      args: options,
      reporter,
      cache
    });
    return fluidResult;
  }; // This will allow the use of html image tags
  // const rawHtmlNodes = select(markdownAST, `html`)
  // vistWithParents does not seem to support async hence the following


  const rawNodes = [];
  visitWithParents(markdownAST, `html`, (node, ancestors) => {
    rawNodes.push(node);
  });
  return Promise.all(rawNodes.map(node => new Promise(async (resolve, reject) => {
    if (!node.value) {
      return resolve(node);
    }

    const $ = cheerio.load(node.value);

    if ($(options.tag).length === 0) {
      return resolve(node);
    }

    const customComponent = $(options.tag);
    const src = customComponent.attr(`src`);

    if (!src) {
      return resolve(node);
    } // can do better here!


    const fileType = src.slice(-3); // Ignore gifs and svgs as we can't process them,

    if (isRelativeUrl(src) && fileType !== `gif` && fileType !== `svg`) {
      const props = await generateImages(src);

      if (props) {
        // Replace the image string
        customComponent.attr('rehyped', JSON.stringify(props));
      }

      node.type = `html`;
      node.value = $(`body`).html();
    }

    return resolve(node);
  })));
};