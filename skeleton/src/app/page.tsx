"use client";

import { useEffect } from "react";
import { GameProviders, Player, PlayerEventContext, useGame } from "narraleaf-react";

// import your assets
import { story } from "../lib/story";
import { GameDialog } from "@/lib/dialog";
import { GameMenu } from "@/lib/menu";

function App() {
  const game = useGame();

  // initialize the game manually
  useEffect(() => {
    game.configure({
      width: 1280, // set the resolution width
      height: 720, // set the resolution height
      aspectRatio: 16 / 9, // set the aspect ratio

      ratioUpdateInterval: 0, // disable the ratio update interval

      dialog: GameDialog, // override the default dialog
      menu: GameMenu, // override the default menu

      // set the default colors
      defaultTextColor: "white",
      defaultNametagColor: "#2987a1",
      defaultMenuChoiceColor: "white",
    });
    game.preference.setPreference("cps", 30); // set the dialog characters per second
  }, []);

  // handle the player ready event
  function handleOnReady({liveGame}: PlayerEventContext) {
    liveGame.newGame();
  }

  return (
    <Player
      story={story}
      width="100vw"
      height="100vh"
      onReady={handleOnReady}
    />
  );
}

export default function Page() {
  return (
    // wrap the app with the GameProviders component
    <GameProviders>
      <App />
    </GameProviders>
  );
}
