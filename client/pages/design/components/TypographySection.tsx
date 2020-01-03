import { SectionHeading } from './SectionHeading'
import { fontSizes } from '~/client/styles/typography'
import { css, jsx } from '@emotion/core'
import { SAMPLE_TEXT } from '../constants'
/** @jsx jsx */ jsx

export let TypographySection = () => {
  return (
    <>
      <SectionHeading>Typography</SectionHeading>

      {Object.entries(fontSizes)
        .reverse()
        .map(([name, value]) => (
          <p
            key={name}
            css={css`
              font-size: ${value};
              overflow-x: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            `}
          >
            {SAMPLE_TEXT}
          </p>
        ))}
    </>
  )
}
