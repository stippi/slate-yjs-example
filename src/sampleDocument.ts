import { Descendant } from 'slate'

export const sampleDocument: Descendant[] = [
  {
    type: 'primary-heading',
    children: [
      {
        text: 'Int. Street - Day'
      },
    ],
  },
  {
    type: 'action',
    children: [
      {
        text: 'A line of text in a paragraph. '
      },
      {
        text: 'Another line with some styling.'
      }
    ],
  },
  {
    type: 'character',
    children: [
      {
        text: 'Manfred'
      }
    ],
  },
  {
    type: 'parenthetical',
    children: [
      {
        text: '(wavering)'
      }
    ],
  },
  {
    type: 'dialog',
    children: [
      {
        text: 'Most real people don\'t come up with something original to say in situations like this.'
      }
    ],
  },
  {
    type: 'action',
    children: [
      {
        text: 'A line of text in an "action" paragraph.'
      }
    ],
  },
]
