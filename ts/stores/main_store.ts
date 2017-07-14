
// TODO create default store
class Store {

}


/**
 * The user configuration store contains information related to the current user
 *
 * @class UserConfigurationStore
 * @extends {Store}
 */
class GameStore extends Store {
 // TODO
}

let gameStore: GameStore;

export const getMissionControlUserConfigurationStore = () => {
  if (!gameStore) {
    gameStore = new GameStore();
  }
  return gameStore;
};
