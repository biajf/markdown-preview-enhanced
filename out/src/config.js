"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const copyValue = (v) => v;
const parseJsonOrDefault = (def) => (raw) => {
    try {
        return JSON.parse(raw);
    }
    catch (error) {
        return def;
    }
};
const parseListOrDefault = (def) => (raw) => {
    return (raw
        .split(",")
        .map((x) => x.trim())
        .filter((x) => x.length) || def);
};
const ConfigSettings = {
    usePandocParser: copyValue,
    breakOnSingleNewLine: copyValue,
    enableTypographer: copyValue,
    enableLinkify: copyValue,
    enableWikiLinkSyntax: copyValue,
    enableEmojiSyntax: copyValue,
    enableExtendedTableSyntax: copyValue,
    enableCriticMarkupSyntax: copyValue,
    wikiLinkFileExtension: copyValue,
    protocolsWhiteList: copyValue,
    mathRenderingOption: copyValue,
    mathRenderingOnlineService: copyValue,
    codeBlockTheme: copyValue,
    previewTheme: copyValue,
    revealjsTheme: copyValue,
    mermaidTheme: copyValue,
    frontMatterRenderingOption: copyValue,
    imageFolderPath: copyValue,
    printBackground: copyValue,
    chromePath: copyValue,
    imageMagickPath: copyValue,
    pandocPath: copyValue,
    pandocMarkdownFlavor: copyValue,
    enableHTML5Embed: copyValue,
    HTML5EmbedUseImageSyntax: copyValue,
    HTML5EmbedUseLinkSyntax: copyValue,
    HTML5EmbedIsAllowedHttp: copyValue,
    HTML5EmbedAudioAttributes: copyValue,
    HTML5EmbedVideoAttributes: copyValue,
    puppeteerWaitForTimeout: (v) => {
        return parseInt(v, 10) || 0;
    },
    usePuppeteerCore: copyValue,
    scrollSync: copyValue,
    liveUpdate: copyValue,
    previewPanePosition: copyValue,
    openPreviewPaneAutomatically: copyValue,
    automaticallyShowPreviewOfMarkdownBeingEdited: copyValue,
    closePreviewAutomatically: copyValue,
    imageUploader: copyValue,
    latexEngine: copyValue,
    enableScriptExecution: copyValue,
    singlePreview: copyValue,
    mathInlineDelimiters: parseJsonOrDefault([["$", "$"], ["\\(", "\\)"]]),
    mathBlockDelimiters: parseJsonOrDefault([["$$", "$$"], ["\\[", "\\]"]]),
    pandocArguments: parseListOrDefault([]),
    fileExtension: parseListOrDefault([".md", ".mmark", ".markdown"]),
    puppeteerArgs: parseListOrDefault([]),
};
class MarkdownPreviewEnhancedConfig {
    static getCurrentConfig() {
        return new MarkdownPreviewEnhancedConfig();
    }
    constructor() {
        for (const name in ConfigSettings) {
            if (ConfigSettings.hasOwnProperty(name)) {
                const transform = ConfigSettings[name];
                const rawValue = atom.config.get(`markdown-preview-enhanced.${name}`);
                this[name] = transform(rawValue);
            }
        }
    }
    onDidChange(subscriptions, callback) {
        for (const name in ConfigSettings) {
            if (ConfigSettings.hasOwnProperty(name)) {
                const transform = ConfigSettings[name];
                const subscription = atom.config.onDidChange(`markdown-preview-enhanced.${name}`, ({ newValue }) => {
                    this[name] = transform(newValue);
                    callback();
                });
                subscriptions.add(subscription);
            }
        }
    }
}
exports.MarkdownPreviewEnhancedConfig = MarkdownPreviewEnhancedConfig;
//# sourceMappingURL=config.js.map