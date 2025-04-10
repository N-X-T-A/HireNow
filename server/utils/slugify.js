const slugify = require("slugify");

/**
 * Generate a clean slug from a given string.
 * @param {string} text - The input text (usually a name or title).
 * @returns {string} - A URL-friendly slug.
 */
function generateSlug(text) {
  return slugify(text, { lower: true, strict: true });
}

module.exports = generateSlug;
