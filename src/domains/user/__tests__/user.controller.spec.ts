import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { OrderService } from '../../order/order.service';
import { UserService } from '../user.service';
import { JwtTokenService } from '../../misc/jwt-token/jwt-token.service';
import { ConfigService } from '@nestjs/config';

describe('User Controller', () => {
    let controller: UserController;
    let service: UserService;

    // beforeEach(async () => {
    //     beforeEach(() => {
    //         const configService = new ConfigService();
    //         const jwtTokenService = new JwtTokenService(configService);
    //         service = new UserService(jwtTokenService);
    //         controller = new UserController(service);
    //     });
    //
    //     describe('findAll', () => {
    //         it('should return an array of cats', async () => {
    //             const result = ['test'];
    //             jest.spyOn(catsService, 'findAll').mockImplementation(() => result);
    //
    //             expect(await catsController.findAll()).toBe(result);
    //         });
    //     });
    //
    //     const module: TestingModule = await Test.createTestingModule({
    //         controllers: [UserController],
    //         providers: [UserService],
    //     }).compile();
    //
    //     controller = module.get<UserController>(UserController);
    //     service = module.get<UserService>(UserService);
    // });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
