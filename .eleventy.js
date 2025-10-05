const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  
  // Configure markdown with footnotes and attributes
  let markdownOptions = {
    html: true,
    breaks: false,
    linkify: true,
    typographer: true
  };
  
  let md = markdownIt(markdownOptions)
    .use(markdownItFootnote)
    .use(markdownItAttrs);
  
  // Customize footnote rendering for sidenotes
  md.renderer.rules.footnote_block_open = () => (
    '<section class="footnotes">\n' +
    '<h2 class="sr-only">Footnotes</h2>\n' +
    '<ol class="footnotes-list">\n'
  );
  
  eleventyConfig.setLibrary("md", md);
  
  // Collections
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("content/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });
  
  eleventyConfig.addCollection("pages", function(collection) {
    return collection.getFilteredByGlob("content/pages/*.md");
  });
  
  // Filters
  eleventyConfig.addFilter("readableDate", dateObj => {
    return dateObj.toDateString();
  });
  
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return dateObj.toISOString().split('T')[0];
  });
  
  // Return configuration
  return {
    dir: {
      input: "content",
      output: "_site",
      includes: "../_includes",
      layouts: "../_layouts",
      data: "../_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/uncommon-contexts/"
  };
};
