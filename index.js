class CountdownTimer{
    constructor({ selector, targetDate }) {
        this.intervalId = null;
        this.isActive = false;
        this.selector = document.querySelector(`${selector}`);
        this.onTick = this.updateTimerFields;
        this.targetDate = targetDate;
        this.init();
    }    
init() {
        const time = this.getTimeComponents(this.targetDate.getTime() - Date.now());
        this.onTick(time);
    }

start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;  
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate.getTime() - currentTime;
            const time = this.getTimeComponents(deltaTime);
            this.onTick(time);
        }, 1000);
  }
  
  //Обновляем инетрфейс на єкране
    updateTimerFields({ days, hours, mins, secs }) {
    this.selector.querySelector('[data-value="days"]').textContent = days;
    this.selector.querySelector('[data-value="hours"]').textContent = hours;
    this.selector.querySelector('[data-value="mins"]').textContent = mins;
    this.selector.querySelector('[data-value="secs"]').textContent = secs;
  }
  
  //Формула индийского друга
     getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
  // Саша Репета pad функция для двоичных чисел чеоез свойство padStart
    pad(value) {
    return String(value).padStart(2, '0');
  }
}


const timer = new CountdownTimer({selector: '#timer-1', targetDate: new Date('Mar 30, 2021')});
timer.start.call(timer);


/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
//const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
//const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
//const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
//const secs = Math.floor((time % (1000 * 60)) / 1000);