import React, { FC } from 'react'
import { Box } from '@vtex/store-ui'

interface Props {
  variant?: string
}

const Container: FC<Props> = ({ variant, children }) => (
  <Box variant={`${variant}.miniature.container`}>{children}</Box>
)

export default Container