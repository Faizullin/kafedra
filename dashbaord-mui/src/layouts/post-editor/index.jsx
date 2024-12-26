/**
 =========================================================
 * Material Dashboard 2 React - v2.2.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components

// @mui icons

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";

// Overview page components
import { useCallback, useEffect, useRef, useState } from "react";

import EditorJS from "@editorjs/editorjs";

import EditorHeader from "@editorjs/header";
import NestedList from "@editorjs/nested-list";
import Warning from "@editorjs/warning";
import Quote from "@editorjs/quote";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import LinkTool from "@editorjs/link";
import Embed from "@editorjs/embed";
import RawTool from "@editorjs/raw";
import Table from "@editorjs/table";
import CodeTool from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import ImageTool from "@editorjs/image";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";

const config = {
  /**
   * Enable/Disable the read only mode
   */
  readOnly: false,

  /**
   * Wrapper of Editor
   */
  holder: "editor",

  /**
   * Common Inline Toolbar settings
   * - if true (or not specified), the order from 'tool' property will be used
   * - if an array of tool names, this order will be used
   */
  // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
  // inlineToolbar: true,

  /**
   * Tools list
   */
  tools: {
    /**
     * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
     */
    header: {
      class: EditorHeader,
      inlineToolbar: ["marker", "link"],
      config: {
        placeholder: "Header",
      },
      shortcut: "CMD+SHIFT+H",
    },

    /**
     * Or pass class directly without any configuration
     */
    // image: SimpleImage,

    image: {
      class: ImageTool,
      config: {
        endpoints: {
          byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
          byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
        },
      },
    },
    list: {
      class: NestedList,
      inlineToolbar: true,
      shortcut: "CMD+SHIFT+L",
    },

    checklist: {
      class: Checklist,
      inlineToolbar: true,
    },

    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: "Enter a quote",
        captionPlaceholder: "Quote's author",
      },
      shortcut: "CMD+SHIFT+O",
    },

    warning: Warning,

    marker: {
      class: Marker,
      shortcut: "CMD+SHIFT+M",
    },

    code: {
      class: CodeTool,
      shortcut: "CMD+SHIFT+C",
    },

    delimiter: Delimiter,

    inlineCode: {
      class: InlineCode,
      shortcut: "CMD+SHIFT+C",
    },

    linkTool: LinkTool,

    raw: RawTool,

    embed: Embed,

    table: {
      class: Table,
      inlineToolbar: true,
      shortcut: "CMD+ALT+T",
    },
  },

  /**
   * This Tool will be used as default
   */
  // defaultBlock: 'paragraph',

  /**
   * Initial Editor data
   */
  data: {
    blocks: [
      {
        id: "zcKCF1S7X8",
        type: "header",
        data: {
          text: "Editor.js",
          level: 1,
        },
      },
      {
        id: "b6ji-DvaKb",
        type: "paragraph",
        data: {
          text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.",
        },
      },
      {
        type: "header",
        id: "7ItVl5biRo",
        data: {
          text: "Key features",
          level: 2,
        },
      },
      {
        type: "list",
        id: "SSBSguGvP7",
        data: {
          items: [
            {
              content: "It is a block-styled editor",
              items: [],
            },
            {
              content: "It returns clean data output in JSON",
              items: [],
            },
            {
              content: "Designed to be extendable and pluggable with a simple API",
              items: [],
            },
          ],
          style: "unordered",
        },
      },
      {
        type: "header",
        id: "QZFox1m_ul",
        data: {
          text: "What does it mean «block-styled editor»",
          level: 2,
        },
      },
      {
        type: "paragraph",
        id: "bwnFX5LoX7",
        data: {
          text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
        },
      },
      {
        type: "paragraph",
        id: "mTrPOHAQTe",
        data: {
          text: `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`,
        },
      },
      {
        type: "header",
        id: "1sYMhUrznu",
        data: {
          text: "What does it mean clean data output",
          level: 2,
        },
      },
      {
        type: "paragraph",
        id: "jpd7WEXrJG",
        data: {
          text: "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
        },
      },
      {
        type: "paragraph",
        id: "0lOGNUKxqt",
        data: {
          text: `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`,
        },
      },
      {
        type: "paragraph",
        id: "WvX7kBjp0I",
        data: {
          text: "Clean data is useful to sanitize, validate and process on the backend.",
        },
      },
      {
        type: "delimiter",
        id: "H9LWKQ3NYd",
        data: {},
      },
      {
        type: "paragraph",
        id: "h298akk2Ad",
        data: {
          text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make its core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
        },
      },
      {
        type: "image",
        id: "9802bjaAA2",
        data: {
          url: "assets/codex2x.png",
          caption: "",
          stretched: false,
          withBorder: true,
          withBackground: false,
        },
      },
    ],
  },
  // onReady: function () {
  //   saveButton.click();
  // },
  // onChange: function (api, event) {
  //   console.log("something changed", event);
  // },
};

// Images

const PostEditorTest = () => {
  const [titleValue, setTitleValue] = useState("");

  const editorRef = useRef(null);
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS(config);
    }
    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  const handleSaveDraft = useCallback(() => {
    console.log("handleSaveDraft");
  }, []);
  const handlePublish = useCallback((save = false) => {
    console.log("publish with save:", save);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox mb={2} display="flex" justifyContent="space-between">
        <MDInput
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          placeholder={"Title"}
        />
        <MDBox>
          <MDButton onClick={handleSaveDraft} sx={{ mr: 2 }}>
            Save draft
          </MDButton>
          <MDButton color={"primary"} onClick={(e) => handlePublish(true)}>
            Publish
          </MDButton>
        </MDBox>
      </MDBox>
      <MDBox mt={5} mb={3}>
        <div id="editor"></div>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default PostEditorTest;
