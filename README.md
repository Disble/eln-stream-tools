# ELN Stream Tools

## Overview

ELN Stream Tools is an extension designed to enhance the ELN Stream experience. It provides features such as text correction for chapters and synopses within the stream.

## Features

- **Text Corrector**: Automatically transforms paragraphs and descriptions into editable text areas for easy correction.
- **Browser Compatibility**: Supports Chrome and Firefox browsers.

## Installation

To install the project, clone the repository and run the following command to install the dependencies:

```bash
yarn install
```


## Development

To start the development server, use the following command:

```bash
yarn dev
```

For Firefox-specific development, use:

```bash
yarn dev:firefox
```


## Building

To build the project for production, run:

```bash
yarn build
```

For Firefox-specific build, use:

```bash
yarn build:firefox
```


## Usage

1. **Activate Text Corrector**: The text corrector can be activated on pages with chapters or synopses. It replaces paragraphs with text areas for easy editing.

2. **Check Page Type**: The extension automatically detects the page type (chapter or synopsis) and adjusts its functionality accordingly.

## Configuration

The project uses a `wxt.config.ts` file for configuration. Key settings include:

- **Extension API**: Set to `chrome`.
- **Modules**: Includes `@wxt-dev/module-react`.
- **Manifest**: Defines permissions and host permissions.

## Scripts

- **compile**: Runs TypeScript compilation without emitting files.
- **postinstall**: Prepares the WXT environment after installation.

## Dependencies

- **React**: ^18.3.1
- **React-DOM**: ^18.3.1
- **TypeScript**: ^5.6.2
- **WXT**: ^0.19.11

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any questions or support, please contact the project maintainers.
