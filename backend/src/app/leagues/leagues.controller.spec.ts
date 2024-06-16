/* eslint-disable @typescript-eslint/no-explicit-any */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';

describe('LeaguesController', () => {
  let app: TestingModule;

  let fakeMongoService: LeaguesService;

  beforeAll(async () => {
    fakeMongoService = {
      findAll: () => {
        throw 'findAll should be mocked';
      },
      findById: () => {
        throw 'findById should be mocked';
      },
    } as any;

    app = await Test.createTestingModule({
      controllers: [LeaguesController],
      providers: [
        {
          provide: LeaguesService,
          useValue: fakeMongoService,
        },
      ],
    }).compile();
  });

  beforeEach(() => jest.restoreAllMocks());

  describe('getAutocomplete', () => {
    it('should return a list of strings', async () => {
      jest.spyOn(fakeMongoService, 'findAll').mockResolvedValue([
        { id: 'A', name: 'League A' },
        { id: 'B', name: 'League B' },
      ] as any);

      const controller = app.get(LeaguesController);
      await expect(controller.getAutocomplete('Leag')).resolves.toEqual({
        data: ['League A', 'League B'],
      });

      expect(fakeMongoService.findAll).toHaveBeenCalledWith({ name: '^Leag' });
    });

    it('should return an empty list when query is missing', async () => {
      const controller = app.get(LeaguesController);
      await expect(controller.getAutocomplete()).resolves.toEqual({
        data: [],
      });
    });

    it('should return an empty list when query too short is missing', async () => {
      const controller = app.get(LeaguesController);
      await expect(controller.getAutocomplete('Le')).resolves.toEqual({
        data: [],
      });
    });
  });

  describe('getOne', () => {
    it('should return one league', async () => {
      const league = {
        id: '[ID]',
        name: 'League C',
        teams: [],
        populate: jest.fn(),
      };

      jest.spyOn(fakeMongoService, 'findById').mockResolvedValue(league as any);

      const controller = app.get(LeaguesController);
      await expect(controller.getOne({ id: league.id })).resolves.toEqual(
        expect.objectContaining({ name: league.name }),
      );

      expect(fakeMongoService.findById).toHaveBeenCalledWith(league.id);
    });

    it('should throw 404 when not found', async () => {
      jest.spyOn(fakeMongoService, 'findById').mockResolvedValue(null);
      const controller = app.get(LeaguesController);
      await expect(controller.getOne({ id: 'ID' })).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('should pass exceptions', async () => {
      jest
        .spyOn(fakeMongoService, 'findById')
        .mockRejectedValue(new Error('Oops'));
      const controller = app.get(LeaguesController);
      await expect(controller.getOne({ id: 'ID' })).rejects.toEqual(
        new Error('Oops'),
      );
    });
  });
});
