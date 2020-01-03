import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { FunctionComponent } from 'react'
import { H, HLevel } from 'react-h-tag'
import { colors } from '~/client/styles/colors'
import { borderRadius, spacing } from '~/client/styles/spacing'
import { fontSizes } from '~/client/styles/typography'
import { ColorsKey } from '../types'
import { SectionHeading } from './SectionHeading'
/** @jsx jsx */ jsx

const Swatch = styled.div<{ inverted?: boolean; color: string }>(
  props => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: ${fontSizes.xs};
    background-color: ${props.color};
    padding: ${spacing.xs};
    border-radius: ${borderRadius.m};
    color: ${props.inverted ? colors.neutral_white : colors.neutral_black};
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.2);
  `
)

const filterColorsByPrefix = (prefix: string) => {
  const filtered: {
    [key in ColorsKey]?: string
  } = {}

  for (const key in colors) {
    if (key.startsWith(prefix)) {
      filtered[key] = colors[key]
    }
  }

  return filtered
}

const primary = filterColorsByPrefix('primary_')
const neutral = filterColorsByPrefix('neutral_')
const info = filterColorsByPrefix('info_')
const warning = filterColorsByPrefix('warning_')
const danger = filterColorsByPrefix('danger_')
const success = filterColorsByPrefix('success_')

const ColorGroup: FunctionComponent<{
  shades: Partial<typeof colors>
  SectionHeading: string
  invertedShades?: ColorsKey[]
}> = ({ shades, SectionHeading, invertedShades = [] }) => {
  const styles = {
    h: css`
      font-size: ${fontSizes.m};
    `,
    swatchContainer: css`
      display: flex;
      flex-wrap: wrap;
      margin-left: -${spacing.xxxs};
    `,
    swatch: css`
      margin-top: ${spacing.xxxs};
      margin-left: ${spacing.xxxs};
    `,
  }

  return (
    <>
      <H css={styles.h}>{SectionHeading}</H>
      <div css={styles.swatchContainer}>
        {Object.entries(shades).map(([key, value]) => {
          const [, label] = key.split('_')
          const inverted = invertedShades.includes(key as keyof typeof colors)
          return (
            <Swatch
              key={key}
              color={value}
              css={styles.swatch}
              inverted={inverted}
            >
              {label}
            </Swatch>
          )
        })}
      </div>
    </>
  )
}

export const ColorSection = () => {
  return (
    <div className="colorSection">
      <SectionHeading>Color</SectionHeading>
      <HLevel>
        <ColorGroup
          SectionHeading="Primary"
          shades={primary}
          invertedShades={[
            'primary_600',
            'primary_700',
            'primary_800',
            'primary_900',
          ]}
        />
        <ColorGroup
          SectionHeading="Neutral"
          shades={neutral}
          invertedShades={[
            'neutral_600',
            'neutral_700',
            'neutral_800',
            'neutral_900',
            'neutral_black',
          ]}
        />
        <ColorGroup
          SectionHeading="Info"
          shades={info}
          invertedShades={['info_600', 'info_700', 'info_900', 'info_800']}
        />
        <ColorGroup
          SectionHeading="Warning"
          shades={warning}
          invertedShades={[
            'warning_600',
            'warning_700',
            'warning_900',
            'warning_800',
          ]}
        />
        <ColorGroup
          SectionHeading="Danger"
          shades={danger}
          invertedShades={[
            'danger_600',
            'danger_700',
            'danger_900',
            'danger_800',
          ]}
        />
        <ColorGroup
          SectionHeading="Success"
          shades={success}
          invertedShades={[
            'success_600',
            'success_700',
            'success_900',
            'success_800',
          ]}
        />
      </HLevel>
    </div>
  )
}
