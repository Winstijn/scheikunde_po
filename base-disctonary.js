var t  = "Ala,	GCU, GCC, GCA, GCG -  Lys,	AAA, AAG -  Arg,	CGU, CGC, CGA, CGG, AGA, AGG -  Met,	AUG -  Asn,	AAU, AAC -  Phe,	UUU, UUC -  Asp,	GAU, GAC -  Pro,	CCU, CCC, CCA, CCG -  Cys,	UGU, UGC	 -  Pyl,	UAG -  Gln,	CAA, CAG -  Sec,	UGA -  Glu,	GAA, GAG -  Ser,	UCU, UCC, UCA, UCG, AGU, AGC -  Gly,	GGU, GGC, GGA, GGG	 -  Thr,	ACU, ACC, ACA, ACG -  His,	CAU, CAC -  Trp,	UGG -  Ile,	AUU, AUC, AUA	 -  Tyr,	UAU, UAC -  Leu,	UUA, UUG, CUU, CUC, CUA, CUG -  Val,	GUU, GUC, GUA, GUG -  START,	AUG, UGG -  STOP,	UAG, UGA, UAA"
var aminoDict = t.split("-")
var baseDictonary = {}

aminoDict.forEach(aminoString => {
    const aminoArray = aminoString.split(",")
    const amino = aminoArray.shift().replace(/\s/g, "")
    aminoArray.forEach(basePaar => {
        baseDictonary[basePaar.replace(/\s/g, "")] = amino
    })
})
console.log(baseDictonary)

