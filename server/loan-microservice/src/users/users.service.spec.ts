import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

const mockUser = {
  name: 'User #1',
  email: 'email1@ac.com',
  password: 'password1',
};

const usersArray = [
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
];

describe('UserService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USER_MODEL',
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(UsersService);
    model = module.get<Model<User>>('USER_MODEL');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'User #1',
        email: 'email1@ac.com',
        password: 'password1',
      } as any),
    );
    const newUser = await service.create({
      name: 'User #1',
      email: 'email2@ac.com',
      password: 'password2',
    });
    expect(newUser).toEqual(mockUser);
  });
});