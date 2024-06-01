# Pokémon Dex App

A React Native Pokémon Dex app that allows users to search, view, and manage their favorite Pokémon. The app includes fuzzy search capabilities, a detailed Pokémon view, and team management using Firebase. Built with PokeAPI and Pokedex-Promise-V2 for seamless Pokémon data fetching.

## Features

- **Pokémon List**: Loads a list of Pokémon with infinite scrolling.
- **Fuzzy Search**: Allows users to search for Pokémon using partial names or typos.
- **Detailed Pokémon View**: Displays detailed information about each Pokémon.
- **Team Management**: Users can add Pokémon to their team and manage their team with a maximum of 6 Pokémon.
- **Firebase Integration**: Stores and manages team data using Firebase Firestore.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/pokemon-dex-app.git
    cd pokemon-dex-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Firebase**:
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
    - Enable Firestore in your Firebase project
    - Add your Firebase configuration to `src/firebase/firebaseConfig.js`

4. **Run the app**:
    ```bash
    npm start
    ```

## Usage

- **Home Screen**: Displays the list of Pokémon. Scroll to load more Pokémon.
- **Search**: Enter a Pokémon name to search. Use the search button to fetch specific Pokémon.
- **Detailed View**: Click on a Pokémon to view detailed information.
- **Team Management**: Add Pokémon to your team and manage your team from the detailed view.

## Code Structure

- **MainDex Component**: Manages the main Pokémon list and search functionality.
- **PokemonListItem Component**: Renders individual Pokémon items in the list.
- **Firebase Integration**: Handles team data storage and management.

## Dependencies

- **React Native**: Mobile app framework.
- **Pokedex-Promise-V2**: Wrapper for PokeAPI.
- **Firebase**: Backend as a service for team management.
- **Axios**: HTTP client for API requests.
- **Fuse.js**: Fuzzy search library.

## Authors

- **Rana Hassan** - (https://github.com/LockonStratos75)

## Acknowledgments

- PokeAPI for the Pokémon data.
- Firebase for backend services.
- React Native community for helpful resources and libraries.
