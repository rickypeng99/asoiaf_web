import React, {Component} from 'react';
import Graph from 'vis-react';
import nodes from './data/nodes.js'
import edges from './data/edges.js'


require('../CharacterDetail/Detail.scss')



var options = {
    autoResize: true,
    width: (window.innerWidth - 25) + "px",
    height: (window.innerHeight - 75) + "px",
    layout: {
        //hierarchical: true
        randomSeed: 7,

    },

    nodes: {
        // fixed: {
        //   x: false,
        //   y: false
        // },
        //shape: "dot",
        size: 10,
        borderWidth: 4,
        borderWidthSelected: 2,
        color: {
            border: '#406897'
        },
        font: {
          size: 10,
          align: "center",
          bold: {
            color: "#bbbdc0",
            size: 15,
            vadjust: 0,
            mod: "bold"
          }
        },
        shapeProperties: {
            useBorderWithImage: true
          }
      },
      edges: {
        width: 0.01,
        color: {
          color: "#a3a1a1",
          highlight: "#797979",
          hover: "#797979",
          //opacity: 1.0
        },
        arrows: {
          to: { enabled: false, scaleFactor: 1, type: "arrow" },
          middle: { enabled: false, scaleFactor: 1, type: "arrow" },
          from: { enabled: false, scaleFactor: 1, type: "arrow" }
        },
        smooth: {
          type: "continuous",
          roundness: 0.5
        }
      },

    interaction:{
        dragNodes: false,
        dragView: true,
        // hideEdgesOnDrag: false,
        // hideNodesOnDrag: false,
        hover: true,
        // hoverConnectedEdges: true,
        // keyboard: {
        //   enabled: false,
        //   speed: {x: 10, y: 10, zoom: 0.02},
        //   bindToWindow: true
        // },
        // multiselect: false,
        // navigationButtons: false,
        // selectable: true,
        //selectConnectedEdges: false,
        // tooltipDelay: 300,
        zoomView: true
      },

      physics:{
          enabled: true,
          barnesHut: {
            avoidOverlap: 0.2
          }
      }
};





class Network extends Component {
    constructor(props){
        super(props)
        this.state = {
            graph: null,
            loaded: false
        }

        this.events = {
            select: function(event) {
                var { nodes, edges } = event;
                console.log(nodes)
            },
        
            hoverNode: function(event){
        
            }
        
        };
        

    }


    componentDidMount(){
        var node = nodes["data"];
        var edge = edges["data"];


        var allNodes = [];


        for(var i = 0; i < node.length - 1; i++){
            allNodes.push({
                id: node[i]["id"],
                label: node[i]["label"],
                value: parseInt(node[i]["value"]),
                shape: 'image',
                image: 'https://awoiaf.westeros.org/images/f/f6/Tyrion_lannister_Sebastian_Giacobino.jpg'
            })
        }

        console.log(allNodes)

        var allEdges = [];

        for(var i = 0; i < edge.length - 1; i++){
            allEdges.push({
                from: edge[i]["Source"],
                to: edge[i]["Target"]
            })
        }


        var graph = {
            nodes: allNodes,
            edges: allEdges
        };
        this.setState({
            graph: graph,
            loaded: true
        })
    }

    

       
        // getNetwork = data => {
        //     this.setState({ network: data });
        //   };
        // getEdges = data => {
        // console.log(data);
        // };
        // getNodes = data => {
        // console.log(data);
        // };
        
        render() {

        var style = {
            // width: "100%",
            // height: "100%",
            border: "none",
            padding: "2rem",
            display: "block",
            margin: "0 auto",
        };
        if(this.state.loaded){
            return(
                <div>
                    <Graph
                        graph={this.state.graph}
                        options={options}
                        events={this.events}
                        style={style}
                        // getNetwork={this.getNetwork}
                        // getEdges={this.getEdges}
                        // getNodes={this.getNodes}
                        vis={vis => (this.vis = vis)}
                    />
                    <p>D</p>          
                </div>
                    
            );
        } else{
            return(
                <p>Loading</p>

            )
        }
        
    }

}

export default Network;