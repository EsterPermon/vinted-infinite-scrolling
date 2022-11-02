class FavouriteStorage {
  private favourites: string[];
  private LS_FAVOURITES_KEY = "LS_FAVOURITES";

  constructor() {
    this.favourites = this.getFavouritesFromStorage();
  }

  private getFavouritesFromStorage = (): string[] => {
    const stringifiedImageKeys = localStorage.getItem(this.LS_FAVOURITES_KEY);
    if (!stringifiedImageKeys) {
      return [];
    }
    return JSON.parse(stringifiedImageKeys);
  };

  public getFavourites = () => this.favourites

  public isImageFavourite = (imageId: string): boolean => {
    return this.favourites.includes(imageId);
  };

  public addImageToFavourites = (imageId: string) => {
    this.favourites.push(imageId);
    localStorage.setItem(
      this.LS_FAVOURITES_KEY,
      JSON.stringify([...this.favourites])
    );
  };
}

const storage = new FavouriteStorage();

export default storage;
