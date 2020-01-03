import { css, jsx } from '@emotion/core'
import { fontSizes, primaryFont } from '~/client/styles/typography'
import { ColorSection } from './components/ColorSection'
import { TypographySection } from './components/TypographySection'
/** @jsx jsx */ jsx

export let DesignPage = () => {
  return (
    <div
      css={css`
        ${primaryFont};
      `}
    >
      <h1
        css={css`
          font-size: ${fontSizes.h3};
        `}
      >
        Design System
      </h1>

      <ColorSection />
      <TypographySection />
    </div>
  )
}
