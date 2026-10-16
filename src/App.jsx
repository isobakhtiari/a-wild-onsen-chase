import { useCallback, useMemo, useRef } from 'react'
import StoryMap from './components/StoryMap.jsx'
import StepText from './components/StepText.jsx'
import ConnectorLines from './components/ConnectorLines.jsx'
import { useScrollama } from './hooks/useScrollama.js'
import { useWheelScroll } from './hooks/useWheelScroll.js'
import { useConnectorPositions } from './hooks/useConnectorPositions.js'
import { steps } from './data/steps.js'

export default function App() {
  const { activeStepId } = useScrollama()
  const textRef = useRef(null)
  useWheelScroll(textRef)

  const mediaRefs = useRef({})
  const dotRefs = useRef({})
  const registerMediaRef = useCallback((mediaKey, node) => {
    mediaRefs.current[mediaKey] = node
  }, [])
  const registerDotRef = useCallback((id, node) => {
    dotRefs.current[id] = node
  }, [])

  const connectorTargets = useMemo(
    () =>
      steps
        .filter((s) => s.dotPixel)
        .flatMap((s) =>
          (s.media || []).map((_, mediaIndex) => ({
            mediaKey: `${s.id}::${mediaIndex}`,
            stepId: s.id,
          }))
        ),
    []
  )
  const positions = useConnectorPositions(textRef, mediaRefs, dotRefs, connectorTargets)

  return (
    <div className="story">
      <StepText
        ref={textRef}
        steps={steps}
        activeStepId={activeStepId}
        registerMediaRef={registerMediaRef}
        footer={
          <div className="methods">
            <h2 className="methods__title">Methods and data</h2>
            <p className="story__subtitle">
              The map was built in QGIS using populated places and urban areas from Natural Earth, and 
              railways, roads, lakes and administrative boundaries from Japan’s National Land Numerical 
              Information service (MLIT). To trace our route, I geocoded each station and stop, then calculated 
              the shortest path along the shinkansen and local rail lines for each leg of the trip. 
              The onsen locations were also geocoded, and the mineral density, pH and geologic origin of each spring were 
              manually collected. The map was styled in Illustrator, and the 
              scrollytelling was built with React and Scrollama.
              <br />
              <br />
              This project was built as part of the Lede Program at Columbia Journalism School.
            </p>
          </div>
        }
      >
        <div className="story__header">
          <p className="story__published">Published: July 11, 2026</p>
          <p className="story__author">By Isobel Bakhtiari</p>
          <h1 className="story__title">A Wild Onsen Chase</h1>
          <p className="story__subtitle">
            Earlier this year, my husband and I, bundled in thermals and down jackets, made our way through northern Japan 
            by bullet train and local rail: first to Nozawa Onsen, then to the tiny town of Tsukioka, north to the 
            coast at Aomori, and finally across the Tsugaru Strait, to stop in Hakodate and Niseko. 
            At every place, we made sure to bathe in the traditional hot springs, or onsen 温泉. 
            This map traces our route across Japan’s railway network, and the particular character of the 
            onsens we visited. 
          </p>
        </div>
      </StepText>
      <div className="story__map">
        <StoryMap activeStepId={activeStepId} steps={steps} registerDotRef={registerDotRef} />
      </div>
      <ConnectorLines
        positions={positions}
        activeStepId={activeStepId}
        connectorTargets={connectorTargets}
      />
    </div>
  )
}
