import { MediaType, MediaItem, ErrorResponse } from "../types";

/**
 * Creates a standardized success response object
 * @param {string} responseType - Type of response (text|media|mixed)
 * @param {object} data - The response data
 * @return {object} - Standardized success response
 */
export const createSuccessResponse = (
  responseType: "text" | "media" | "mixed" | "html",
  data: object
) => {
  return {
    success: true,
    responseType: responseType,
    data: data,
  };
};

/**
 * Creates a standardized error response object
 * @param {string} message - Error message
 * @param {number} code - Error code
 * @param {string} details - Additional error details
 * @return {object} - Standardized error response
 */
export const createErrorResponse = (
  message: string,
  code: number = 500,
  details: string = ""
): ErrorResponse => {
  return {
    success: false,
    error: {
      message: message,
      code: code,
      details: details,
    },
  };
};

/**
 * Creates a text-only response object
 * @param {object} textData - Text data to include in the response
 * @return {object} - Standardized text response
 */
export const createTextResponse = (textData: object) => {
  return createSuccessResponse("text", {
    text: textData,
  });
};

/**
 * Creates a media-only response object
 * @param {array} mediaItems - Array of media items
 * @return {object} - Standardized media response
 */
export const createMediaResponse = (mediaItems: Array<any>) => {
  return createSuccessResponse("media", {
    media: mediaItems,
  });
};

/**
 * Creates a HTML response object
 * @param {object} htmlData - HTML data to include in the response
 * @return {object} - Standardized HTML response
 */
export const createHtmlResponse = (htmlData: object) => {
  return createSuccessResponse("html", {
    html: htmlData,
  });
};

/**
 * Creates a mixed text and media response object
 * @param {object} textData - Text data to include in the response
 * @param {array} mediaItems - Array of media items
 * @return {object} - Standardized mixed response
 */
export const createMixedResponse = (
  textData: string | number | boolean | object,
  mediaItems: Array<MediaItem>
) => {
  return createSuccessResponse("mixed", {
    text: textData,
    media: mediaItems,
  });
};

/**
 * Creates a standardized media item object
 * @param {string} type - Media type (image|pdf|audio|video)
 * @param {string} url - URL of the media
 * @param {string} mimeType - MIME type of the media
 * @param {string} description - Description of the media
 * @param {object} metadata - Additional metadata about the media
 * @return {object} - Standardized media item
 */
export const createMediaItem = (
  type: MediaType,
  url: string,
  mimeType: string = "",
  description: string = "",
  metadata: object = {}
): MediaItem => {
  return {
    type: type,
    url: url,
    mimeType: mimeType,
    description: description,
    metadata: metadata,
  };
};
