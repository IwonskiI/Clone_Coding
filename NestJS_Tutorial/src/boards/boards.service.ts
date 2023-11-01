import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardsService {

    constructor(private boardRepository: BoardRepository){}

    async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
        const { title, description } = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board);
        return board;
    }

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async getBoardById(id: number): Promise<Board>{
        const found = await this.boardRepository.findOneBy({id:id});

        if (!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;

    }

    async deleteBoard(id:number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        console.log(result);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);
        
        return board
    }
}
