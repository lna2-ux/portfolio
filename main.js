/**
 * main.js — WEBD-1008 Project 4
 * Author : Lovepreet Singh
 * Shared across all pages.
 * Handles: mobile hamburger navigation toggle.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navMenu');

  if (!toggle || !menu) { return; }

  /* Open / close menu */
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* Close when a link is tapped (mobile UX) */
  var links = menu.querySelectorAll('a');
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close when clicking anywhere outside the nav */
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
