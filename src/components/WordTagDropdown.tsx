import _ from 'lodash'
import React from 'react'
import { connect } from "react-redux"
import { Dropdown, Button, Menu } from 'antd'
import SentenceWord from '../processors/parts/SentenceWord'
import WordVariation from '../processors/parts/WordVariation'
import { ClickParam } from 'antd/lib/menu'
import ACTIONS from '../modules/action'

interface WordTagDropdownProperties {
  word: SentenceWord,
  selectVariationForWord: (wordId: string, variationId: string) => any
}

interface WordTagDropdownState {
  selectedVariation: WordVariation
}

class WordTagDropdown extends
  React.Component<WordTagDropdownProperties, WordTagDropdownState> {
  constructor(params: any) {
    super(params)

    this.state = {
      selectedVariation: this.props.word.getBestVariation()
    }

    this.handleDropdownMenuClick = this.handleDropdownMenuClick.bind(this)
  }

  createMenuFromVariations(variations: WordVariation[]) {
    return <Menu onClick={this.handleDropdownMenuClick}>
      {_.map(variations, (v, i) => {
        let d = this.state.selectedVariation === v
        return <Menu.Item key={i} disabled={d}>{v.toString()}</Menu.Item>
      })}
    </Menu>
  }

  handleDropdownMenuClick(e: ClickParam) {
    const { word, selectVariationForWord } = this.props
    const v = word.getVariationByIndex(parseInt(e.key))

    this.setState({ ...this.state, selectedVariation: v })

    // TODO: Change variation for a word
    selectVariationForWord(word.uuid, v.uuid)
  }

  render() {
    const { word } = this.props
    const { selectedVariation } = this.state

    // If there is no selected best variation then
    // there are no variations at all.
    if (!selectedVariation) return <b>No variations.</b>

    // First create the menu element with buttons to change
    // the variation selection for this word
    const menu = this.createMenuFromVariations(word.variations)

    // Now display a dropdown to make id able to change the variation,
    // with a button inside to call this dropdown
    // FIXME: can change into text later
    return <Dropdown overlay={menu} placement="topCenter">
      <Button>{selectedVariation.toString()}</Button>
    </Dropdown>
  }
}

const mapDispatchToProps = dispatch => ({
  selectVariationForWord: (wordId: string, variationId: string) => dispatch(ACTIONS.selectVariationForWord(wordId, variationId))
});

export default connect(null, mapDispatchToProps)(WordTagDropdown)
