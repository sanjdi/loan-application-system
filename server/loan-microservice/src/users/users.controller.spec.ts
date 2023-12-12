import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'User #1',
                email: 'email1@ac.com',
                password: 'password1',
              },
              {
                name: 'User #2',
                email: 'email2@ac.com',
                password: 'password2',
              },
              {
                name: 'User #3',
                email: 'email3@ac.com',
                password: 'password3',
              },
            ]),
            create: jest
              .fn()
              .mockImplementation((createUserDto: CreateUserDto) =>
                Promise.resolve({ _id: '1', ...createUserDto }),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get(UsersController);
    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'User #1',
        email: 'email1@ac.com',
        password: 'password1',
      };

      expect(controller.create(createUserDto)).resolves.toEqual({
        _id: '1',
        ...createUserDto,
      });
    });
  });

  describe('findAll()', () => {
    it('should get an array of users', () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'User #1',
          email: 'email1@ac.com',
          password: 'password1',
        },
        {
          name: 'User #2',
          email: 'email2@ac.com',
          password: 'password2',
        },
        {
          name: 'User #3',
          email: 'email3@ac.com',
          password: 'password3',
        },
      ]);
    });
  });
});