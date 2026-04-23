/**
 * Do not alter this comment block.
 * Only fill out the information below.
 *
 * Competency 16
 * Name: Lovepreet Singh
 * Date: April 12, 2026
 * Description: Fetches a list of Golden Retriever dog images from the Dog CEO API
 *              and dynamically creates HTML elements to display each image
 *              along with its index number inside the main wrapper element.
 */

/**
 * validation.js — WEBD-1008 Project 4
 * Author : Lovepreet Singh
 *
 * Contact form validation — fires on Submit click only.
 *
 * Rules:
 *   Name    — must not be empty
 *   Phone   — exactly 10 digits  (Regular Expression)
 *   Email   — valid email format  (Regular Expression)
 *   Comments— must not be empty
 *
 * On error:
 *   1. Previously hidden error <span> is made visible (.visible class)
 *   2. Focus is set to the field in error
 *   3. Field text is highlighted / selected
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ── Field & error-message references ────────── */
  var nameField     = document.getElementById('name');
  var phoneField    = document.getElementById('phone');
  var emailField    = document.getElementById('email');
  var commentsField = document.getElementById('comments');

  var nameErr     = document.getElementById('nameErr');
  var phoneErr    = document.getElementById('phoneErr');
  var emailErr    = document.getElementById('emailErr');
  var commentsErr = document.getElementById('commentsErr');

  /* ── Regular Expressions ──────────────────────── */
  var PHONE_REGEX = /^\d{10}$/;                     /* exactly 10 digits          */
  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  /* standard email format      */

  /* ── Helpers ──────────────────────────────────── */

  /** clearError — removes error state from a single field */
  function clearError(field, errSpan) {
    field.classList.remove('field-error');
    errSpan.classList.remove('visible');
  }

  /** clearAll — wipes all error states before re-validation */
  function clearAll() {
    clearError(nameField,     nameErr);
    clearError(phoneField,    phoneErr);
    clearError(emailField,    emailErr);
    clearError(commentsField, commentsErr);
  }

  /* ── Main validation function ─────────────────── */
  function validate() {
    clearAll();

    var isValid       = true;
    var firstErrField = null;
    var firstErrSpan  = null;

    /* Helper: record first error found */
    function flagError(field, errSpan) {
      field.classList.add('field-error');
      errSpan.classList.add('visible');
      if (isValid) {           /* capture only the first offender */
        firstErrField = field;
        firstErrSpan  = errSpan;
      }
      isValid = false;
    }

    /* --- Name: not empty --- */
    if (nameField.value.trim() === '') {
      flagError(nameField, nameErr);
    }

    /* --- Phone: exactly 10 digits --- */
    var digits = phoneField.value.replace(/\D/g, '');
    if (!PHONE_REGEX.test(digits)) {
      flagError(phoneField, phoneErr);
    }

    /* --- Email: valid format --- */
    if (!EMAIL_REGEX.test(emailField.value.trim())) {
      flagError(emailField, emailErr);
    }

    /* --- Comments: not empty --- */
    if (commentsField.value.trim() === '') {
      flagError(commentsField, commentsErr);
    }

    /* Focus + select the first field with an error */
    if (firstErrField) {
      firstErrField.focus();
      firstErrField.select();
    }

    return isValid;
  }

  /* ── Attach submit handler (fires on Submit click only) ── */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!validate()) {
        e.preventDefault();  /* block submission if errors exist */
      }
      /* If valid, form submits to action="index.html" */
    });
  }

  /* ── Reset button: clear visual error states ─── */
  var resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      setTimeout(clearAll, 0);  /* run after browser clears values */
    });
  }

  /* ── Live clear: remove red border as user types ── */
  [nameField, phoneField, emailField, commentsField].forEach(function (f) {
    if (f) {
      f.addEventListener('input', function () {
        f.classList.remove('field-error');
      });
    }
  });

});
