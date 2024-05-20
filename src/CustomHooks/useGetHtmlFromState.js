import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

import { $generateHtmlFromNodes } from '@lexical/html'

export const useGetHtmlFromState = (state) => {
    const [html, setHtml] = useState("")
  
    function MyCustomStateToHtmlPlugin() {
      const [editor] = useLexicalComposerContext()
      editor.update(() => {
        const html = $generateHtmlFromNodes(editor, null)
        setHtml(html)
      })
  
      return null
  }

    const theme = {
      code: 'editor-code',
      heading: {
        h1: 'editor-heading-h1',
        h2: 'editor-heading-h2',
        h3: 'editor-heading-h3',
        h4: 'editor-heading-h4',
        h5: 'editor-heading-h5',
      },
      image: 'editor-image',
      link: 'editor-link',
      list: {
        listitem: 'editor-listitem',
        nested: {
          listitem: 'editor-nested-listitem',
        },
        ol: 'editor-list-ol',
        ul: 'editor-list-ul',
      },
      ltr: 'ltr',
      paragraph: 'editor-paragraph',
      placeholder: 'editor-placeholder',
      quote: 'editor-quote',
      rtl: 'rtl',
      text: {
        bold: 'editor-text-bold',
        code: 'editor-text-code',
        hashtag: 'editor-text-hashtag',
        italic: 'editor-text-italic',
        overflowed: 'editor-text-overflowed',
        strikethrough: 'editor-text-strikethrough',
        underline: 'editor-text-underline',
        underlineStrikethrough: 'editor-text-underlineStrikethrough',
      },
  }
  
  const AuxEditor = () => {
    return (
      <LexicalComposer
        initialConfig={{
          namespace: "MyEditor",
          onError: console.error,
          editorState: state,
          theme: theme,
          nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode,
          ],
        }}
      >
        <MyCustomStateToHtmlPlugin />
      </LexicalComposer>
    )
  }
  
  return { html, AuxEditor }
  }