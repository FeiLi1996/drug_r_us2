def make_drug_list():
    initial_drug_set=[];
    with open('final_drug_list.txt') as raw_drug_list:
        lines = raw_drug_list.readlines()

        for line in lines:

            if ';' in line:
                temp_list =[]
                temp_list = line.split(';')
                for drug in temp_list:
                    if drug.lower().strip() not in initial_drug_set:
                     initial_drug_set.append(drug.lower().strip())
            else:
                if line.lower().strip() not in initial_drug_set:
                    initial_drug_set.append(line.lower().strip())
    return ( initial_drug_set)

