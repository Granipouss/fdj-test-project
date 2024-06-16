import type {
  AutocompleteDTO,
  LeagueDetailsDTO,
  LeagueListDTO,
} from 'api-interfaces';

import { fetch } from '../support/helpers';

describe('Backend e2e', () => {
  describe('Leagues Controller', () => {
    describe('GET /api/leagues', () => {
      it('should return many leagues', async () => {
        const response = await fetch('/api/leagues');
        expect(response.status).toBe(200);

        const body: LeagueListDTO = await response.json();
        expect(body).toMatchSnapshot();
      });

      it('should search for leagues', async () => {
        const response = await fetch('/api/leagues?q=ligue');
        expect(response.status).toBe(200);

        const body: LeagueListDTO = await response.json();
        expect(body).toMatchSnapshot();
      });
    });

    describe('GET /api/leagues/autocomplete', () => {
      it('should return some suggestions', async () => {
        const response = await fetch('/api/leagues/autocomplete?q=Fren');
        expect(response.status).toBe(200);

        const body: AutocompleteDTO = await response.json();
        expect(body).toMatchSnapshot();
      });
    });

    describe('GET /api/leagues/:id', () => {
      it('should return league details', async () => {
        const response = await fetch('/api/leagues/5d2cdcf7da07b95bb8f16ed1');
        expect(response.status).toBe(200);

        const body: LeagueDetailsDTO = await response.json();
        expect(body).toMatchSnapshot();
      });

      it('should return 404 on wrong ids', async () => {
        const response = await fetch('/api/leagues/5d2d01fdda07b95bb8f16f0a');
        expect(response.status).toBe(404);
      });

      it('should return 404 on invalid mongo id', async () => {
        const response = await fetch('/api/leagues/invalid');
        expect(response.status).toBe(404);
      });
    });
  });

  describe('Teams Controller', () => {
    describe('GET /api/teams/:id', () => {
      it('should return team details', async () => {
        const response = await fetch('/api/teams/5d2d01fdda07b95bb8f16f0a');
        expect(response.status).toBe(200);

        const body: LeagueDetailsDTO = await response.json();
        expect(body).toMatchSnapshot();
      });

      it('should return 404 on wrong ids', async () => {
        const response = await fetch('/api/teams/5d2cdcf7da07b95bb8f16ed1');
        expect(response.status).toBe(404);
      });

      it('should return 404 on invalid mongo id', async () => {
        const response = await fetch('/api/teams/invalid');
        expect(response.status).toBe(404);
      });
    });
  });
});
