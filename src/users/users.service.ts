import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Ali Faiz',
      email: 'ali.faiz@brainxtech.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Ali Iqbal',
      email: 'ali.iqbal@brainxtech.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Anees Ur Rehman',
      email: 'anees.rehman@brainxtech.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Hassan',
      email: 'hassan@brainxtech.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length)
        throw new NotFoundException('User roles not found');

      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.filter((user) => user.id === id);

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  create(user: CreateUserDto) {
    const highestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: highestId[0]?.id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
