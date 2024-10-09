# Demo Theme Documentation

This documentation provides an overview of the `demo-theme`, a customizable theme designed for integration with SUMMIT, an open-source E-commerce platform built on top of ERPNext. SUMMIT combines E-commerce functionality with robust ERP features, making it an ideal solution for online businesses that require comprehensive backend management. For more information on the SUMMIT project or to clone the repository, you can visit the official [GitHub repository](https://github.com/summit-webapp/summit).

# Getting Started

This guide outlines the steps required to install, configure, and update the `demo-theme` for your SUMMIT-based application.

## Table of Contents

1. [Installation](#installation)
2. [Updating a Theme](#updating-a-theme)

## Installation

Follow the steps below to set up the `demo-theme` and integrate it into your SUMMIT application.

1. #### Clone the Demo Theme Repository

   First, clone your forked version of the `demo-theme` repository to your local machine:

   ```bash
   git clone <your forked github repo url>
   ```

2. #### Navigate to the Demo Theme Directory
   ```bash
   cd demo-theme
   ```
3. #### Install this theme
   ```bash
   /bin/bash install-theme.sh
   ```
   This script ensures that all theme components and styles are propagated into the core SUMMIT folder, effectively integrating the theme into the application.

## Updating a Theme

If any modifications are made to the theme, it is essential to update the existing setup to reflect the changes. Follow these steps to update the `demo-theme`:

1. #### Navigate to the Demo Theme Directory

   Ensure you are in the `demo-theme` folder before running the update:

   ```bash
   cd demo-theme
   ```

2. #### Run the Update Script
   Execute the following command to propagate changes made to theme components:
   ```bash
   /bin/bash update-theme.sh
   ```
   This command ensures that all updates to the components and styles are successfully applied within the demo-theme directory.

# Live Demonstration

To view a live demonstration of the SUMMIT E-commerce platform with the demo-theme, visit the following link: [SUMMIT B2B Demo](https://summit-b2b-demo.8848digital.com/).

This live demo showcases the features and design capabilities of the theme when integrated with SUMMIT.
