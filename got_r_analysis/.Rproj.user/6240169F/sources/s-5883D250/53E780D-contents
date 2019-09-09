nodes = read.csv("asoiaf-all-nodes.csv", header = TRUE)
edges = read.csv("asoiaf-all-edges.csv", header = TRUE)

# Find top 100 characters with most interactions (weights on edges)
names = c()
#labels = c()
weights = c()
for(i in (1:nrow(nodes))){
  names[i] = as.character(nodes$Id[i])
  #labels[i] = as.character(nodes$Label[i])
  weights[i] = sum(edges[edges$Source == as.character(nodes$Id[i]) | edges$Target == as.character(nodes$Id[i]), ]$weight)
}

df = as.data.frame(cbind(names, labels, weights))
df$weights
df = df[order(-as.numeric(as.character(df$weights)) ),]
id = as.character(head(df, 100)$names)
value = head(df, 100)$weights
class(value)
label = gsub("-", " ", id)

topCharacters = as.data.frame(cbind(id, label, value = as.numeric(as.character(value))))
topCharacters


getTopCharacterEdges = function(index){
  #All edges of which Source is tyrion and target belongs to top or vice versa, and with weight larger than 50
  #Tyrion Lannister, modify to change to others
  # tyrionEdges = edges[((top[index] == as.character(edges$Source) & as.character(edges$Target) %in% top) | 
  #                       (top[index] == as.character(edges$Target) & as.character(edges$Source) %in% top)) & edges$weight > 50 ,]
  
  topCharacterEdges = edges[(top[index] == as.character(edges$Source) & as.character(edges$Target) %in% top),]
  if(nrow(topCharacterEdges[topCharacterEdges$weight > 50,]) > 0){
    topCharacterEdges = topCharacterEdges[topCharacterEdges$weight > 50,]
  } else{
    topCharacterEdges = head(topCharacterEdges[order(-as.numeric(as.character(topCharacterEdges$weight))), ], 1)
  }
  return(topCharacterEdges)
}


topCharacterEdges = c()
for(i in (1: 100)){
  temp =  getTopCharacterEdges(i)
  topCharacterEdges = rbind(topCharacterEdges, temp)
}
topCharacterEdges

allNodes = toJSON(topCharacters)
allEdges = toJSON(topCharacterEdges[,c('Source', 'Target')])
#To json file

write_json(allNodes, path = "nodes.json")
write_json(allEdges, path = "edges.json")






library('jsonlite')

#data frame form the json file from api of ice and fire
api = fromJSON(txt = "characters.json", flatten = TRUE) 

results = api
findId = function(name){
  decodedName = gsub("-", " ", name)
  results = api[as.character(api$Name) == decodedName,]
  #when there are more than one same
  if(nrow(results) > 1){
    weight = c() #length of povBooks, tvSeries...etc. The character with the longest one is most likely the one we want
    #print(results)
    for(i in (1:nrow(results))){
      weight[i] = length(results$PovBooks[[i]]) + length(results$TvSeries[[i]]) + length(results$Aliases[[i]]) + length(results$Titles[[i]])
    }
    #print(weight)
    index = which.max(weight)
    return(results$Id[index])
  } else if(nrow(results) == 0){
    return(-1)
  } else{
    return(results$Id)
  }
  
}
findId("Daenerys-Targaryen")



topId = c() #id corresponding to the top 100 characters
for(i in (1:length(top))){
  topId[i] = findId(top[i])
}
topId


chaNameId = as.data.frame(cbind(top, topId))
c = toJSON(chaNameId)
#To json file
write_json(chaNameId, path = "characterId.json")


allJonSnow = edges[(edges$Source == "Jon-Snow" | edges$Target == "Jon-Snow") & edges$Weight >= 30,]
class(as.character(allJonSnow$Source))

getNodesFromSet = function(set){
  result = c(as.character(set$Source),as.character(set$Target))
  return(unique(result))
}

JonSnowNodes = getNodesFromSet(allJonSnow)
JonSnowNodesId = JonSnowNodes
JonSnowNodesLabel = gsub("-", " ", JonSnowNodesId)

JonSnowNodes = data.frame(JonSnowNodesId, JonSnowNodesLabel)

JonSnowEdges = allJonSnow[,c('Source', 'Target')]
JonSnowEdges

nodes = toJSON(JonSnowNodes)
edges = toJSON(JonSnowEdges)
edges
#To json file

write_json(nodes, path = "nodes.json")
write_json(edges, path = "edges.json")







nodes = read.csv("asoiaf-all-nodes.csv", header = TRUE)

edges = read.csv("asoiaf-all-edges.csv", header = TRUE)



#other experiments
fiftyEdges = edges[edges$weight >= 50, ]
fiftyEdges
fiftyNodes = c()
count = 1
(nodes$Id)[1]
for(i in (1: nrow(nodes))){
  if(nodes$Id[i] %in% fiftyEdges$Source | nodes$Id[i] %in% fiftyEdges$Target){
    fiftyNodes[count] = as.character((nodes$Id)[i])
    count = count + 1
    }
}
fiftyNodes





#install.packages("igraph")
library("igraph")


allJonSnow$Source

jonsnowedges = c()
for(i in (1 : nrow(allJonSnow))){
  print(allJonSnow$Source[i])
  jonsnowedges = append(jonsnowedges, levels(allJonSnow$Source)[allJonSnow$Source[i]])
  jonsnowedges = append(jonsnowedges, levels(allJonSnow$Target)[allJonSnow$Target[i]])
  
}
jonsnowedges


g = graph(jonsnowedges,
          directed=FALSE)
plot(g)


l <- layout.fruchterman.reingold(g, niter=5000, area=vcount(g)^4*10)


g1 = graph(g, layout=l, 
                           edge.arrow.size=0.5, 
                           vertex.label.cex=0.75, 
                           vertex.label.family="Helvetica",
                           vertex.label.font=2,
                           vertex.shape="circle", 
                           vertex.size=1, 
                           vertex.label.color="black", 
                           edge.width=0.5)
plot(g1)
