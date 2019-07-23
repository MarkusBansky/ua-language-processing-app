import React from 'react'
import Paragraph from 'antd/lib/typography/Paragraph'


export const pageHeaderContent = (
  <div className="content">
    <Paragraph>
      Welcome to 'Ukrainian NLP' page. This tool allows you to dig deeper into the texts you have and help you make new discoveries as well as gain new experience.
    </Paragraph>
    <Paragraph>
      To begin with, please enter the text you wich to analyse in the box below. The text you can input could be of any length and size. It sohuld contain text only with default standard puncture and without any special symbols. The text should be in ukrainian language only!
    </Paragraph>
  </div>
)

export const pageHeaderExtraContent = (
  <img
    style={{marginTop: -30}}
    width='200'
    src="https://cdn.dribbble.com/users/678637/screenshots/3861502/research.png"
    alt="content"
  />
)
