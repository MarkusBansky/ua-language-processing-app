import React, { Component } from "react";
import { Tag, Tooltip } from "antd";
import WordWrapper from "./WordWrapper";

function generateColor(word, analysed) {
  if (!word || !analysed) return '';

  if (analysed.tags.find(t => t.tag === 'noun')) return 'cyan';
  if (analysed.tags.find(t => t.tag === 'adj')) return 'magenta';
  if (analysed.tags.find(t => t.tag === 'adv')) return 'volcano';
  if (analysed.tags.find(t => t.tag === 'verb')) return 'blue';

  if (word !== analysed.original) return '#f50';
}

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Word extends Component {
  renderWrapper() {
    const { analysedWord, index } = this.props;
    const formulae = analysedWord.analysis && analysedWord.analysis.length > 0 ?
      analysedWord.analysis[0] : null;

    let color = generateColor(analysedWord.word, formulae);
    let value = index === 0 ? jsUcfirst(analysedWord.word) : analysedWord.word;


    return <WordWrapper word={value} analysedForms={analysedWord.analysis}>
      <Tag style={{marginBottom: 5}} color={color}>{value}</Tag>
    </WordWrapper>
  }

  renderTooltip() {
    const { analysedWord, index } = this.props;
    const tag = analysedWord.analysis && analysedWord.analysis.length === 1
      ? jsUcfirst(analysedWord.analysis[0].tags.sort((a,b) => a.is_pos < b.is_pos).map(t => t ? t.meaning : '').join(', '))
      : ''

    return <Tooltip title={tag}>
      <span className='text-red' style={{marginRight: 8}}>
        {index === 0 ? jsUcfirst(analysedWord.word) : analysedWord.word}
      </span>
    </Tooltip>
  }

  render() {
    const { analysedWord } = this.props;

    return analysedWord.analysis && analysedWord.analysis.length > 1
      ? this.renderWrapper()
      : this.renderTooltip()
  }
}

export default Word;
