import React from 'react'
import Page from 'components/Page'
import GameBanners from './components/GameBanners'
import HeroSection from './components/HeroSection'
import InforAndChainSection from './components/InforAndChainSection'
import EventSection from './components/EventSection'
import GamesSection from './components/GamesSection'
import LeaderboardSection from './components/LeaderboardSection'

const GameCenter = () => {
  return (
    <Page>
        <HeroSection />
        <GameBanners />
        <InforAndChainSection />
        <EventSection />
        <GamesSection />
        <LeaderboardSection />
    </Page>
  )
}

export default GameCenter