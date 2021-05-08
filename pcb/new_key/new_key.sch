EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title ""
Date ""
Rev ""
Comp ""
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L power:+5V #PWR?
U 1 1 60961F79
P 6550 2750
F 0 "#PWR?" H 6550 2600 50  0001 C CNN
F 1 "+5V" H 6565 2923 50  0000 C CNN
F 2 "" H 6550 2750 50  0001 C CNN
F 3 "" H 6550 2750 50  0001 C CNN
	1    6550 2750
	1    0    0    -1  
$EndComp
$Comp
L power:GNDREF #PWR?
U 1 1 60963E8D
P 6300 2500
F 0 "#PWR?" H 6300 2250 50  0001 C CNN
F 1 "GNDREF" H 6305 2327 50  0000 C CNN
F 2 "" H 6300 2500 50  0001 C CNN
F 3 "" H 6300 2500 50  0001 C CNN
	1    6300 2500
	0    1    1    0   
$EndComp
Wire Notes Line
	7200 3100 7200 2150
Wire Notes Line
	7200 2150 5650 2150
Wire Notes Line
	5650 2150 5650 3100
Wire Notes Line
	5650 3100 7200 3100
$Comp
L Device:C_Small C?
U 1 1 609693AF
P 6300 2850
F 0 "C?" H 6392 2896 50  0000 L CNN
F 1 "C_Small" H 6392 2805 50  0000 L CNN
F 2 "" H 6300 2850 50  0001 C CNN
F 3 "~" H 6300 2850 50  0001 C CNN
	1    6300 2850
	1    0    0    -1  
$EndComp
Wire Wire Line
	6300 2750 6550 2750
$EndSCHEMATC
