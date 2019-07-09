import _ from 'lodash'
import React from 'react'
import ACTIONS from "../modules/action";
import { connect } from "react-redux";
import { Dropdown, Button, Menu } from 'antd';

class WordTagDropdown extends React.Component {
  constructor(params) {
    super(params)

    const { word } = this.props

    this.state = {
      selectedVariation: word.getBestVariation()
    }

    this.handleDropdownMenuClick = this.handleDropdownMenuClick.bind(this)
  }

  createMenuForDropdown(variations) {
    return <Menu onClick={this.handleDropdownMenuClick}>
      {_.map(variations, (v, i) => {
        let d = this.state.selectedVariation === v
        return <Menu.Item key={i} disabled={false}>{v.toString()}</Menu.Item>
      })}
    </Menu>
  }

  handleDropdownMenuClick(e) {
    const { traingPOSTag, word, pt, nt } = this.props
    const { variations } = word
    const v = variations[e.key]

    this.setState({ ...this.state, selectedVariation: v })

    let trainRows = []
    trainRows.push({ leftWordTagId: pt.id, rightWordTagId: nt.id, mainWordTagId: v.posTag.id, correct: 1 })

    variations.filter(variation => variation !== v).forEach(variation => {
      trainRows.push({ leftWordTagId: pt.id, rightWordTagId: nt.id, mainWordTagId: variation.posTag.id, correct: 0 })
    })

    traingPOSTag(trainRows)
  }

  render() {
    const { word } = this.props
    const { selectedVariation } = this.state
    const menu = this.createMenuForDropdown(word.variations)

    if (!selectedVariation) return <b>No variations.</b>

    return <Dropdown overlay={menu} placement="topCenter">
      <Button>{selectedVariation.toString()}</Button>
    </Dropdown>
  }
}

const mapDispatchToProps = dispatch => ({
  traingPOSTag: listOfTagRows => dispatch(ACTIONS.traingPOSTag(listOfTagRows))
});

export default connect(null, mapDispatchToProps)(WordTagDropdown)
