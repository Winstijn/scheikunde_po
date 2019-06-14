//
//  Scheikunde PO
//  Joren Hofmeester, Fyor Klein Gunnewiek,
//  Yvonne Wijfjes, Winstijn Smit 
//
//  Created by Winstijn Smit
//  Copyright © 2019 Kaziaat B.V. All rights reserved.
//

__TRANSLATE_RNA = {
    "T": "A",
    "A": "U",
    "C": "G",
    "G": "C",
}

__TRANSLATE_COMPLEMENTAIR= {
    "T": "A",
    "A": "T",
    "C": "G",
    "G": "C",
}

// Based on information found in the BiNaS.
__AMINO_ZUREN = JSON.parse(`{"A":{"name":"alanine","shortCode":"ala"},"R":{"name":"arginine","shortCode":"arg"},"N":{"name":"asparagine","shortCode":"asn"},"D":{"name":"asparaginezuur","shortCode":"asp"},"C":{"name":"cysteine","shortCode":"cys"},"Q":{"name":"glutamine","shortCode":"gln"},"E":{"name":"glutaminezuur","shortCode":"glu"},"G":{"name":"glycine","shortCode":"gly"},"H":{"name":"histidine","shortCode":"his"},"I":{"name":"isoleucine","shortCode":"ile"},"L":{"name":"leucine (mogelijk Start)","shortCode":"leu"},"K":{"name":"lysine","shortCode":"lys"},"M":{"name":"methionine (Start)","shortCode":"met"},"F":{"name":"phenylalanine","shortCode":"phe"},"P":{"name":"proline","shortCode":"pro"},"S":{"name":"serine","shortCode":"ser"},"T":{"name":"threonine","shortCode":"thr"},"W":{"name":"tryptofaan (of Start)","shortCode":"trp"},"Y":{"name":"tyrosine","shortCode":"tyr"},"V":{"name":"valine","shortCode":"val"}, "*":{"name":"Stop Codon", "shortCode":"STOP"}, "O":{"name":"Pyrrolysine (of Stop)","shortCode":"pyl"},"U":{"name":"Selenocysteïne (of Stop)","shortCode":"sec"}}`)
__BASE_DICTONARY = JSON.parse(`{"GCU":"Ala","GCC":"Ala","GCA":"Ala","GCG":"Ala","AAA":"Lys","AAG":"Lys","CGU":"Arg","CGC":"Arg","CGA":"Arg","CGG":"Arg","AGA":"Arg","AGG":"Arg","AUG":"Met","AAU":"Asn","AAC":"Asn","UUU":"Phe","UUC":"Phe","GAU":"Asp","GAC":"Asp","CCU":"Pro","CCC":"Pro","CCA":"Pro","CCG":"Pro","UGU":"Cys","UGC":"Cys","UAG":"STOP","CAA":"Gln","CAG":"Gln","UGA":"STOP","GAA":"Glu","GAG":"Glu","UCU":"Ser","UCC":"Ser","UCA":"Ser","UCG":"Ser","AGU":"Ser","AGC":"Ser","GGU":"Gly","GGC":"Gly","GGA":"Gly","GGG":"Gly","ACU":"Thr","ACC":"Thr","ACA":"Thr","ACG":"Thr","CAU":"His","CAC":"His","UGG":"Trp","AUU":"Ile","AUC":"Ile","AUA":"Ile","UAU":"Tyr","UAC":"Tyr","UUA":"Leu","UUG":"Leu","CUU":"Leu","CUC":"Leu","CUA":"Leu","CUG":"Leu","GUU":"Val","GUC":"Val","GUA":"Val","GUG":"Val","UAA":"STOP"}`)

// need to fix stop codons.

// Used as between the AMINO_ZUREN and BASE_DICTONARY to get the AMINO_ZUUR
__AMINO_DICTONARY = JSON.parse(`{"ala":"A","arg":"R","asn":"N","asp":"D","cys":"C","gln":"Q","glu":"E","gly":"G","his":"H","ile":"I","leu":"L","lys":"K","met":"M","phe":"F","pro":"P","ser":"S","thr":"T","trp":"W","tyr":"Y","val":"V", "STOP":"*", "S":"O", "sec":"U"}`)
