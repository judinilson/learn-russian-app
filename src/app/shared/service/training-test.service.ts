import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { DragDropQuestion } from "src/app/pages/test/questions-answers/questions-answers.component";
import { environment } from "../environment";
import { TrainingContent } from "../Model/Training-Content";
import { Statistic } from "../Model/Statistic";

@Injectable()
export class TrainingTestService {
  constructor(private http: HttpClient) {}

  private trainingTestData = new BehaviorSubject<any>(null);
  currrentest = this.trainingTestData.asObservable();

  /* PASS SELECTED TRAINING FROM A (component) to B (component)*/
  private trainingSelectedData = new BehaviorSubject<any>(null);
  currenttrainingSelectedData = this.trainingSelectedData.asObservable();

  totalCorrectAnswer = null;
  totalIncorrectAnswer = null;
  totalQestions = null;
  totalAnswers = null;
  testDone = null;
  _start = null;
  _continue = null;

  // items = [
  //   'Отмечать',
  //   'Печь',
  //   'Принимать',
  //   'Разыгрывать',
  //   'Стараться',
  //   'Устраивать',
  // ];

  droplistAnsFirst: DragDropQuestion[] = new Array(
    { key: "соревнования", value: "Устраивать" },
    { key: "стать лучше", value: "Стараться" },
    { key: "праздник", value: "Отмечать" },
    { key: "блины", value: "Печь" },
    { key: "конкурсы", value: "Разыгрывать" },
    { key: "гостей", value: "Принимать" }
  );

  // itemsDragSecond = [
  //   '',
  //   'Печь',
  //   'Принимать',
  //   'Разыгрывать',
  //   'Стараться',
  //   'Устраивать',
  // ];

  // droplistAnsSecond: DragDropQuestion[] = new Array(
  //   { key: "соревнования second", value: "Устраивать" },
  //   { key: "стать лучше", value: "Стараться" },
  //   { key: "праздник", value: "Отмечать" },
  //   { key: "блины", value: "Печь" },
  //   { key: "конкурсы", value: "Разыгрывать" },
  //   { key: "гостей", value: "Принимать" },
  // )

  //selected data
  newSelectedData(data: any) {
    this.trainingSelectedData.next(data);
  }

  getTrainingContent() {
    return this.http.get<TrainingContent>(environment.trainingDataUrl);
  }

  // post training content
  upploadTrainingContent(data) {
    return this.http.post<TrainingContent>(
      environment.trainingDataPostUrl,
      data
    );
  }

  // update training content
  updateTrainingContent(id, data) {
    return this.http.put(`${environment.trainingDataPutUrl} ${id} `, data);
  }

  // Delete training content
  deleteTrainingContent(id) {
    return this.http.delete(`${environment.trainingDataDeleteUrl} ${id} `);
  }

  // statistic http client
  getStatistic() {
    return this.http.get<Statistic>(environment.statisticUrl);
  }

  createStatistic(data) {
    return this.http.post<Statistic>(environment.statisticPostUrl, data);
  }

  //new training test
  newTraining(test: any) {
    this.trainingTestData.next(test);
  }
}
