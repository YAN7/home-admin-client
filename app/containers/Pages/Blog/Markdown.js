import React from 'react';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';
import Quote from 'dan-components/Quote';
import CodeReader from './CodeReader';
import { InlineCodeStyled, LinkStyled, ListItemStyled, Heading } from './MarkdownRenderers';

const renderers = {
  /* eslint-disable-next-line react/prop-types */
  heading: ({ level, ...props }) => {
    let variant;
    let paragraph;
    console.log('level', level, props);
    switch (level) {
      case 1:
        variant = 'h4';
        break;
      case 2:
        variant = 'subtitle1';
        break;
      case 3:
        variant = 'h5';
        break;
      case 4:
        variant = 'h6';
        paragraph = true;
        break;
      default:
        variant = '';
        break;
    }

    return <Typography {...props} gutterBottom variant={variant} paragraph={paragraph} />;
  },
  listItem: ({
    tight, // eslint-disable-line
    ordered, // eslint-disable-line
    ...props
  }) => (
    <ListItemStyled>
      <Typography component="span" {...props} />
    </ListItemStyled>
  ),
  paragraph: props => <Typography {...props} paragraph />,
  code: CodeReader,
  inlineCode: InlineCodeStyled,
  blockquote: Quote,
  link: LinkStyled,
};

export default function Markdown(props) {
  return <ReactMarkdown renderers={renderers} {...props} />;
}
