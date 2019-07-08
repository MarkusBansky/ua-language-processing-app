import _ from 'lodash'
import React, { Component } from "react"
import { Popover } from 'antd'

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class WordWrapper extends Component {
  constructor(params) {
    super(params)
    this.state = {
      tags: []
    }
  }

  createTitle(word) {
    return <b>{word}</b>
  }

  createContent(forms) {
    if (!forms || forms.length === 0) return ''

    return <div>
      {_.map(forms, (form, key) => {
        if(!form.tags || form.tags.length === 0) return ''
        return <span key={key}>{jsUcfirst(form.tags.sort((a,b) => a.is_pos < b.is_pos).map(t => t ? t.meaning : '').join(', '))}<br/></span>
      })}
    </div>
  }

  render() {
    const { word, analysedForms, children } = this.props

    return <Popover
      content={this.createContent(analysedForms)}
      title={this.createTitle(word)}
    >
      {children}
    </Popover>
  }
}

export default WordWrapper
