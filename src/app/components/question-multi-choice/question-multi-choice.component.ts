import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-question-multi-choice',
  templateUrl: './question-multi-choice.component.html',
  styleUrls: ['./question-multi-choice.component.scss'],
})
export class QuestionMultiChoiceComponent implements OnInit {
  UNANSWERED = 0;
  SELECTED = 1;
  CORRECT = 2;
  INCORRECT = 3;

  public gameObject: any;
  @Input() public question: any;
  loaded = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.load();
  }

  async load() {
    this.gameObject = await this.api.getGame();
    this.loaded = true;
  }


  guess(question, answer) {
    if (question.answer != "") { return; }
    question.answer = answer;
    question.state = (question.answer === question.correct_answer) ? this.CORRECT : this.INCORRECT;
    if (question.state == this.CORRECT) {
      this.api.answerGood(100);
    } else {
      this.api.answerBad();
    }
  }

  selectQuestionIcon(question, answer) {
    var result = "noicon";
    if (question.answer == "") {
      result = "noicon"; // no guesses yet
    } else {
      if (question.correct_answer == answer && question.answer == answer) {
        result = "happy";
      } else if (question.correct_answer == answer) {
        result = "star";
      } else if (answer == question.answer) {
        result = "sad";
      }
    }
    return result;
  }

}
