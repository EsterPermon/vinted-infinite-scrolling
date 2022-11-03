/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />
/// <reference types="cypress-real-events" />

import { screenSizes } from "../constants/gallery";
import {
  FAVOURITE_IMAGE_DATA_CY,
  IMAGE_FAVOURITE_BUTTON_DATA_CY,
  IMAGE_FRAME_DATA_CY,
  IMAGE_OVERLAY_DATA_CY,
  IMAGE_OWNER_DATA_CY,
  IMAGE_TITLE_DATA_CY,
} from "../../src/utils/data-cy-constants";
import "cypress-real-events/support";

describe("Gallery", () => {
  before(() => {
    cy.visit("/");
  });

  describe("Gallery grid", () => {
    screenSizes.forEach(({ rowSize, screenSize }) => {
      it(`Should be able to show ${rowSize} images per row with ${screenSize} viewport`, () => {
        cy.viewport(screenSize[0], screenSize[1]);
        cy.get(`[data-cy="${IMAGE_FRAME_DATA_CY}_${rowSize - 1}"]`).should(
          "be.visible"
        );
      });
    });
  });
  
 describe("Scrolling", () => {
   it(`Should load more images on scroll`, () => {
      cy.wait(1000);
      cy.scrollTo("bottom");
      cy.get(`[data-cy*="${IMAGE_FRAME_DATA_CY}"]`).should(
        "have.length.at.least",
        21
      );
    });
  });

  describe("Hover", () => {
    it(`Should show overlay on hover`, () => {
      cy.wait(1000);
      cy.get(`[data-cy*="${IMAGE_FRAME_DATA_CY}"]`)
        .eq(0)
        .realHover()
        .find(`[data-cy="${IMAGE_OVERLAY_DATA_CY}"]`)
        .find(`[data-cy="${IMAGE_OWNER_DATA_CY}"]`);

      cy.get(`[data-cy*="${IMAGE_FRAME_DATA_CY}"]`)
        .eq(0)
        .realHover()
        .find(`[data-cy="${IMAGE_OVERLAY_DATA_CY}"]`)
        .find(`[data-cy="${IMAGE_FAVOURITE_BUTTON_DATA_CY}"]`);

      cy.get(`[data-cy*="${IMAGE_FRAME_DATA_CY}"]`)
        .eq(0)
        .realHover()
        .find(`[data-cy="${IMAGE_OVERLAY_DATA_CY}"]`)
        .find(`[data-cy="${IMAGE_TITLE_DATA_CY}"]`);
    });
  });

  describe("Favourite", () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    it(`Should add image to favourite when click button`, () => {
      cy.wait(1000);
      cy.get(`[data-cy*="${IMAGE_FRAME_DATA_CY}"]`)
        .eq(0)
        .realHover()
        .find(`[data-cy="${IMAGE_OVERLAY_DATA_CY}"]`)
        .find(`[data-cy="${IMAGE_FAVOURITE_BUTTON_DATA_CY}"]`)
        .click({ force: true });
    });

    it(`Should disable button when image is favourite`, () => {
      cy.wait(1000);
      cy.get(`[data-cy="${FAVOURITE_IMAGE_DATA_CY}"]`)
        .eq(0)
        .realHover()
        .find(`[data-cy="${IMAGE_OVERLAY_DATA_CY}"]`)
        .find(`[data-cy="${IMAGE_FAVOURITE_BUTTON_DATA_CY}"]`)
        .should("be.disabled");
    });

    it(`Should find favourite image after refresh`, () => {
      cy.wait(1000);
      cy.reload();
      cy.wait(1000);
      cy.get(`[data-cy="${FAVOURITE_IMAGE_DATA_CY}"]`);
    });
  });
});
