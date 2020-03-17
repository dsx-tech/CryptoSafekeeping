export default class MultisigContract{
    constructor(){
    this.BYTECODE = '0x608060405234801561001057600080fd5b50610dea806100206000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806354fd4d501161006657806354fd4d501461022457806370a08231146102a757806395d89b41146102ff578063a9059cbb14610382578063dd62ed3e146103d05761009e565b806306fdde03146100a3578063095ea7b31461012657806318160ddd1461017457806323b872dd14610192578063313ce56714610200575b600080fd5b6100ab610448565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100eb5780820151818401526020810190506100d0565b50505050905090810190601f1680156101185780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101726004803603604081101561013c57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104e6565b005b61017c6105d0565b6040518082815260200191505060405180910390f35b6101fe600480360360608110156101a857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105d6565b005b610208610959565b604051808260ff1660ff16815260200191505060405180910390f35b61022c61096c565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561026c578082015181840152602081019050610251565b50505050905090810190601f1680156102995780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102e9600480360360208110156102bd57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a0a565b6040518082815260200191505060405180910390f35b610307610a53565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561034757808201518184015260208101905061032c565b50505050905090810190601f1680156103745780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6103ce6004803603604081101561039857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610af1565b005b610432600480360360408110156103e657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610cef565b6040518082815260200191505060405180910390f35b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104de5780601f106104b3576101008083540402835291602001916104de565b820191906000526020600020905b8154815290600101906020018083116104c157829003601f168201915b505050505081565b80600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040518082815260200191505060405180910390a35050565b60005481565b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156106a1575080600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b80156106ad5750600081115b6106b657600080fd5b61070881600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d7690919063ffffffff16565b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061079d81600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d9590919063ffffffff16565b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061086f81600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d9590919063ffffffff16565b600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040518082815260200191505060405180910390a3505050565b600260009054906101000a900460ff1681565b60048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610a025780601f106109d757610100808354040283529160200191610a02565b820191906000526020600020905b8154815290600101906020018083116109e557829003601f168201915b505050505081565b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60038054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ae95780601f10610abe57610100808354040283529160200191610ae9565b820191906000526020600020905b815481529060010190602001808311610acc57829003601f168201915b505050505081565b604060048101600036905014610b0357fe5b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015610b525750600082115b610b5b57600080fd5b610bad82600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d9590919063ffffffff16565b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610c4282600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d7690919063ffffffff16565b600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3505050565b6000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600080828401905083811015610d8b57600080fd5b8091505092915050565b600082821115610da457600080fd5b60008284039050809150509291505056fea265627a7a7231582077c7ae4c1f3e74f2ff1d191a3899bceb2db26182af37798ed620197723cb622864736f6c63430005100032'
    this.abiJSON = [
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "_owner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "_spender",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "Approval",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "_from",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "_to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			},
			{
				"constant": true,
				"inputs": [
					{
						"internalType": "address",
						"name": "_spender",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "_owner",
						"type": "address"
					}
				],
				"name": "allowance",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "address",
						"name": "_spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [
					{
						"internalType": "address",
						"name": "_owner",
						"type": "address"
					}
				],
				"name": "balanceOf",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "decimals",
				"outputs": [
					{
						"internalType": "uint8",
						"name": "",
						"type": "uint8"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "name",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "symbol",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "totalSupply",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "address",
						"name": "_recipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "transfer",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": false,
				"inputs": [
					{
						"internalType": "address",
						"name": "_from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "_to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "_value",
						"type": "uint256"
					}
				],
				"name": "transferFrom",
				"outputs": [],
				"payable": false,
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"constant": true,
				"inputs": [],
				"name": "version",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"payable": false,
				"stateMutability": "view",
				"type": "function"
			}
    ];
    }
}