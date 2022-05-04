import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail.adapter";
import { FeedbacksRepository } from "../repositories/models/feedbacks.repository";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";

export class CreateFeedbackService {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly mailAdapter: NodemailerMailAdapter
  ) {}

  async execute(createFeedbackDto: CreateFeedbackDto) {
    const { type, comment, screenshot } = createFeedbackDto;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Feedback do usuário",
      body: [
        `<div style="font-family: sans-serif; font-size= 16px; c olor=#111">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
