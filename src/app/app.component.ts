import { Component } from "@angular/core";
import { IdleTimeoutManager } from "idle-timer-manager";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "learn-russian";
  timer: any;

  ngOnInit() {
    this.timer = new IdleTimeoutManager({
      timeout: 700, //expired after 10 secs
      onExpired: () => {
        console.log("Expired");
        localStorage.clear();
      },
    });
  }
  ngOnDestroy() {
    this.timer.clear();
  }
}
