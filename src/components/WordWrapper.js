import _ from 'lodash'
import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Popover, Card, Table } from 'antd'
import WordTagDropdown from './WordTagDropdown';

class WordWrapper extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    const el = document.getElementById('word_info')
    const { word } = this.props;

    if (
      el.innerHTML !== ''
      && el.getElementsByClassName('ant-card-head-title')[0].innerHTML === word.word) {
      ReactDOM.unmountComponentAtNode(el)
      return
    }

    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Meaning', dataIndex: 'meaning', key: 'meaning' },
      { title: 'Single', dataIndex: 'single', key: 'single' },
    ]

    const content = <div className="content">
      {_.map(word.variations, (v, i) =>
        <Table
          bordered
          key={i}
          pagination='none'
          dataSource={v.additionalTags.map((t, j) => {
            return { ...t, key: j }
          })}
          columns={columns}
          size="middle"
        />)}
      </div>

    const wordInfo = <Card title={word.word}>
      <div className="wrap">
        <div className="content">{content}</div>
      </div>
    </Card>

    ReactDOM.render(wordInfo, el)
  }

  createTitle(w) {
    return <b>{w.word}</b>
  }

  createContent(word) {
    return <div>
      <p>You can choose the correct POS:</p>
      <WordTagDropdown word={word} />
    </div>
  }

  render() {
    const { word, children } = this.props
    const v = word.getBestVariation()

    return <Popover
      onClick={this.handleClick}
      content={this.createContent(word)}
      title={v ? v.posTag.meaning : word.word}
    >
      {children}
    </Popover>
  }
}

export default WordWrapper
