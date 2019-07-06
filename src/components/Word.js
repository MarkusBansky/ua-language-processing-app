import React, { Component } from "react";
import { Tag } from "antd";

function generateColor(word, analysed) {
  if (!word || !analysed) return '';

  if (analysed.lemmas.find(lemma => lemma.value === 'noun')) return 'cyan';
  if (analysed.lemmas.find(lemma => lemma.value === 'adj')) return 'red';
  if (analysed.lemmas.find(lemma => lemma.value === 'adv')) return 'volcano';
  if (analysed.lemmas.find(lemma => lemma.value === 'verb')) return 'blue';

  if (word !== analysed.original) return '#f50';
}

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Word extends Component {
  render() {
    const { analysedWord, index } = this.props;
    const formulae = analysedWord.analysis && analysedWord.analysis.length > 0 ?
      analysedWord.analysis[0] : null;

    let color = generateColor(analysedWord.word, formulae);
    let value = index === 0 ? jsUcfirst(analysedWord.word) : analysedWord.word;
    return <Tag style={{marginBottom: 5}} color={color}>{value}</Tag>
  }
}

export default Word;
