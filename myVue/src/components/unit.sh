display_loop() {
   echo "Display numbers from $1 to $2:"

   # courses=($1 $2 $3 $4)

   for ((i=$1; i<=$2; i++)); do
     echo "Number: $i"
   done
}

display_loop 0 5

