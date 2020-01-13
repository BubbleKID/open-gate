boolean recordedSignal[] = {
  0, 1, 0,  //1    0,1,2
  0, 1, 0,  //4    3,4,5
  0, 1, 0,  //7    6,7,8
  0, 1, 0,  //10   9,10,11
  0, 0, 1,  //14   12,13,14
  0, 0, 1,  //17   15,16,17
  0, 1, 1,  //20   18,19,20
  0, 0, 1,  //23   21,22,23
  0, 0, 1,  //26   24,25,26
  0, 0, 1,  //29   27,28,29
  0, 1, 1,  //32   30,31,32
  0, 1, 1,  //35   33,34,35
  0, 1, 1   //38   36,37,38
};

#define VCC 13
#define DATA 12 
#define GND 11

void setup() {
  Serial.begin(9600);
  delayMicroseconds(100000);
  pinMode(GND, OUTPUT);
  pinMode(VCC, OUTPUT);
  pinMode(DATA, OUTPUT);

  digitalWrite(GND, LOW);
  digitalWrite(VCC, HIGH);
}

void loop() {
  for (int i = 0; i < sizeof(recordedSignal) - 1; i++) {
    Serial.println("1");
    digitalWrite(DATA, recordedSignal[i]);
    if (i == 11) {} else if (i == 20) {

    } else if (i == 22) {

    } else if (i == 31) {
      delayMicroseconds(300);
    } else {
      delayMicroseconds(300);
    }
    int k = 190;
    if (i == 1) {
      delayMicroseconds(k);
    }
    if (i == 4) {
      delayMicroseconds(k);
    }
    if (i == 7) {
      delayMicroseconds(k);
    }
    if (i == 10) {
      delayMicroseconds(k);
    }
    if (i == 14) {
      delayMicroseconds(k);
    }
    if (i == 16) {

    }
    if (i == 17) {
      delayMicroseconds(k);
    }
    if (i == 18) {
      delayMicroseconds(k + 100);
    }
    if (i == 19) {
      delayMicroseconds(k + 400);
    }
    if (i == 23) {
      delayMicroseconds(k);
    }
    if (i == 26) {
      delayMicroseconds(k);
    }
    if (i == 29) {
      delayMicroseconds(k);
    }
    if (i == 30) {
      delayMicroseconds(k + 200);
    }
    if (i == 32) {
      delayMicroseconds(k);
    }
    if (i == 35) {
      delayMicroseconds(k);
    }
    if (i == 38) {
      delayMicroseconds(k);
    }
  }
  delayMicroseconds(9600000);
}